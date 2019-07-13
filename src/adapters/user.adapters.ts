import { plainToClass } from 'class-transformer';

import { 
    ApiError,
    UserDoesNotExistError,
    UserBadRequestError
} from '@entities/ApiError';
import { User } from '@entities/User';

import * as dbRequests from '@dbRequests';
import { parseUserFromDatabase } from '@services/user.services';

// ###############################################################
// ##########            READING OPERATIONS             ##########
// ###############################################################

const getUser = async (userId: string): Promise<User | ApiError> => {
    try {
        let obtainedUser = await dbRequests.getUserById(userId);
        return (obtainedUser) ? 
            plainToClass(User, parseUserFromDatabase(obtainedUser)) : 
            new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

const getUserByUsername = async (username: string): Promise<User | ApiError> => {
    try {
        let obtainedUser = await dbRequests.getUserByUsername(username);
        return (obtainedUser) ? 
            plainToClass(User, parseUserFromDatabase(obtainedUser)) : 
            new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

const getUserByToken = async (userToken: string): Promise<User | ApiError> => {
    try {
        let obtainedUser = await dbRequests.getUserByToken(userToken);
        return (obtainedUser) ? 
            plainToClass(User, parseUserFromDatabase(obtainedUser)) : 
            new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

const checkIfUserExists = async (searchingParam: string, paramValue: string): Promise<User | null> => {
    try {
        let obtainedUser = await dbRequests.checkIfUserExists(searchingParam, paramValue);
        return (obtainedUser) ? 
            plainToClass(User, parseUserFromDatabase(obtainedUser)) : 
            null;
    } catch (error) {
        throw error;
    }
};

// ###############################################################
// ##########           UPDATING OPERATIONS             ##########
// ###############################################################

const updateUserToken = async (userId: string, newToken: string): Promise<User | ApiError> => {
    try {
        let obtainedUser = await dbRequests.updateUserToken(userId, newToken);
        return (obtainedUser) ? 
            plainToClass(User, parseUserFromDatabase(obtainedUser)) : 
            new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

const updateUserLoginData = async (userId: string, newToken: string): Promise<User | ApiError> => {
    try {
        let obtainedUser = await dbRequests.updateUserLoginData(userId, newToken);
        return (obtainedUser) ? 
            plainToClass(User, parseUserFromDatabase(obtainedUser)) : 
            new UserDoesNotExistError();
    } catch (error) {
        return new UserBadRequestError(error.message);
    }
};

export {
    getUser,
    getUserByUsername,
    getUserByToken,
    checkIfUserExists,
    updateUserToken,
    updateUserLoginData
}