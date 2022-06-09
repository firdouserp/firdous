const HttpException = require('../utils/HttpException.utils');
const UserModel = require('../models/user.model');
const ProjectModel = require('../models/projects.model');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const auth = (...roles) => {
    return async function (req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            const projectid = req.headers.project;
            const bearer = 'Bearer ';

            if (!authHeader || !authHeader.startsWith(bearer)) {
                throw new HttpException(401, 'Access denied. No credentials sent!');
            }

            if (!projectid || !projectid>0) {
                throw new HttpException(401, 'No Project selected!');
            }

            const token = authHeader.replace(bearer, '');
            const secretKey = process.env.SECRET_JWT || "";

            // Verify Token
            const decoded = jwt.verify(token, secretKey);
            const user = await UserModel.findOne({ id: decoded.user_id });

            if (!user) {
                throw new HttpException(401, 'Authentication failed!');
            }

            const project = await ProjectModel.findOne({ id: projectid });
            if (!project) {
                throw new HttpException(401, 'Project not found!');
            }
            // check if the current user is the owner user
            const ownerAuthorized = req.params.id == user.id;

            // if the current user is not the owner and
            // if the user role don't have the permission to do this action.
            // the user will get this error
            if (!ownerAuthorized && roles.length && !roles.includes(user.role)) {
                throw new HttpException(409, 'You do not have the permission to do this action');
            }

            // if the user has permissions
            req.currentUser = user;
            req.projectid=projectid;

            next();

        } catch (e) {
            if (e instanceof jwt.TokenExpiredError) {
                e.status = 401;
            }
            //e.status = 401;
            console.log(e);
            next(e);
        }
    }
}

module.exports = auth;