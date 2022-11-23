import jwt from 'jsonwebtoken'
export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    try {
        if (token) {
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

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
