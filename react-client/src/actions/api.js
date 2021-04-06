import axios from 'axios';

const baseUrl = "http://localhost:60702/api/";

export const api =  {
    player(url = baseUrl + 'players/'){
        return{
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}