import passport from 'passport'
import passportLocal from 'passport-local'

//declaration merging
import GoogleIdTokenStrategy from 'passport-google-id-token'
import JwtStrategy from 'passport-jwt'
import { Request, Response, NextFunction } from 'express'

import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../util/secrets'
import { doesNotThrow } from 'assert'

// const LocalStrategy = passportLocal.Strategy

export const googleStrategy = new GoogleIdTokenStrategy(
  {
    clientId: GOOGLE_CLIENT_ID,
  },
  (parsedToken: any, googleId: any, done: any) => {
    console.log('parsed token', parsedToken)
    console.log('google id', googleId)
    // const user = await User.findOrCreate(parsedToken)
    const user = {
      firstName: 'long',
      lastName: 'do',
      createdAt: '01/04/2022',
      dob: '01/09/1998',
      email: 'long.do@integrify.io',
    }

    done(null, user)
    // const done = (err, user) => {
    // req.user = user
    //}
  }
)

export const jwtStrategy = new JwtStrategy.Strategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  (payload: any, done: any) => {
    console.log('payload', payload)
    const email = payload.email
    // const user = User.findByEmail(email)
    const user = {}
    done(null, user)
  }
)
