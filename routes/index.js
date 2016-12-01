'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const boom = require('boom');

router.get('/', (req, res, next) => {
 if (req.session.userInfo !== undefined) {
  res.render('index', {
   stuff: `<ul id='nav-mobile' class="right hide-on-med-and-down">
<li><a class="logout" href="/">Log Out</a></li>
<li><a href="day">Day</a></li>
<li><a href="activities">Activities</a></li>
<li><a href="cheats">Cheats</a></li>
</ul>
<ul class="side-nav" id="mobile-demo">
<li><a class="logout" href="/">Log Out</a></li>
<li><a href="day">Day</a></li>
<li><a href="activities">Activities</a></li>
<li><a href="cheats">Cheats</a></li>
</ul>`
  })
 } else {
  res.render('index')
 }
})

router.post('/', (req, res) => {
 if (req.body.login === '') {
  if (req.body.email === '') {
   res.render('index', {
    email: 'email'
   })
  } else if (req.body.password === '') {
   res.render('index', {
    pswd: 'pswd'
   })
  } else {
   knex('users')
    .where('email', req.body.email)
    .then((user) => {
     if (user.length === 0) {
      res.render('index', {
       error: 'blahblah'
      })
     } else {
      if (bcrypt.compareSync(req.body.password, user[0].hash)) {
       delete user[0].hash;
       req.session.userInfo = user[0];
       if (user[0].is_admin) {
        res.redirect('users');
       } else {
        res.redirect('day');
       }
      } else {
       res.render('index', {
        error: 'blahblah'
       });
      }
     }
    })
  }
 } else if (req.body.signup === '') {
  if (req.body.email === '') {
   res.render('index', {
    email: 'email'
   })
  } else if (req.body.password === '') {
   res.render('index', {
    pswd: 'pswd'
   })
  } else {
   knex('users')
    .where('email', req.body.email)
    .then((user) => {
     if (user.length === 0) {
      knex('users')
       .returning('*')
       .insert({
        tot_pts: 0,
        lvl: 0,
        email: req.body.email,
        hash: bcrypt.hashSync(req.body.password, 12),
        is_admin: false
       })
       .then((user1) => {
        console.log(user1[0]);
        knex('day')
         .returning('*')
         .insert({
          user_id: user1[0].id,
          day_pts: 0,
          m_health: false,
          m_water: false,
          a_health: false,
          a_water: false,
          n_health: false,
          n_water: false,
          choice: false,
          tod: 'Morning',
          given_bonus_pts: false
         })
         .then((user2) => {
          delete user1[0].hash;
          req.session.userInfo = user1[0];
          console.log('hey i be here');
          res.redirect('/levels');
         })
       })
     } else {
      res.render('index', {
       logged: 'blahblah'
      });
     }
    })
  }

 } else {
  knex('users')
   .where('email', req.body.email)
   .then((user) => {
    if (user.length === 0) {
     knex('users')
      .returning('*')
      .insert({
       tot_pts: 0,
       lvl: 0,
       email: req.body.email,
       hash: 'password',
       accessToken: req.body.accessToken,
       is_admin: false
      })
      .then((user1) => {
       knex('day')
        .returning('*')
        .insert({
         user_id: user1[0].id,
         day_pts: 0,
         m_health: false,
         m_water: false,
         a_health: false,
         a_water: false,
         n_health: false,
         n_water: false,
         tod: 'Morning',
         choice: false,
         given_bonus_pts: false
        })
        .then((user2) => {
         delete user1[0].hash;
         delete user1[0].accessToken;
         req.session.userInfo = user1[0];
         res.send('/levels');
        })
      })
    } else {
     delete user[0].hash;
     delete user[0].accessToken;
     req.session.userInfo = user[0];
     console.log(user[0]);
     res.send('/day');
    }
   })
 }
})

router.delete('/', (req, res, next) => {
 req.session = null;
 res.send('nulled')
});
module.exports = router;
