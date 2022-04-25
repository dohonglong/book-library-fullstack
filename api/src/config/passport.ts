//declaration merging
import GoogleIdTokenStrategy from 'passport-google-id-token'
import JwtStrategy from 'passport-jwt'

import { GOOGLE_CLIENT_ID, JWT_SECRET } from '../util/secrets'
import UserService from '../services/user'

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
  }
)

export const jwtStrategy = new JwtStrategy.Strategy(
  {
    secretOrKey: JWT_SECRET,
    jwtFromRequest: JwtStrategy.ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done: any) => {
    const email = payload.email
    const user = await UserService.findByEmail(email)
    done(null, user)
  }
)
