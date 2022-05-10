import client from './client';

const endpoint = '/users';

const getUsers = () => client.get(endpoint)

export  default {
    getUsers,
}