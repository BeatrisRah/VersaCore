import rateLimit from 'express-rate-limit'

export const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 100,
    message: 'Too many requests, try again later.',
})

export const authLimiter = rateLimit({
    windowMs: 60 * 1000, 
    max: 5,
    message: 'Too many login attempts, try again in 1 minute.',
})