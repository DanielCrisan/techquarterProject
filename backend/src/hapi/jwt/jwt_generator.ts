import * as jwt from 'jsonwebtoken';
import { SECRET_TOKEN } from '../../ds/secrets';
import { User } from '../../ds/models/user';

function generateJwtToken(user: User) {
  const accessToken = jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    SECRET_TOKEN,
    { expiresIn: '1h' }
  );

  return accessToken;
}

export default generateJwtToken;
