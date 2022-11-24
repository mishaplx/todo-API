import jwt from 'jsonwebtoken'

/**
 * Проверка токена
 * @param req
 * @param res
 * @param next
 */
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    try {
        if (token) {
            try {
                const secret = process.env.JWT_SECRET_KEY
                const decode = jwt.verify(token, secret)

                req.userId = decode._id
                next()
            } catch (e) {
                res.status(403).json({
                    message: 'нет доступа',
                })
            }
        } else {
            res.status(403).json({
                message: 'нет доступа',
            })
        }
    } catch (e) {
        console.log(e)
    }
}
