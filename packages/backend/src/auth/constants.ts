export const jwtConstants = {
  secret: process.env.SECRET_KEY || 'secretKey',
  expiresIn: process.env.TOKEN_EXPIRE_IN || '1h',
};
