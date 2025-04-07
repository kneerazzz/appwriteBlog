import conf from '../conf/conf.js';
import  {Account , ID, Client} from 'appwrite';

export class AuthService {
    client = new Client();
    account;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);

        this.account = new Account(this.client);

    }
    async createAccount({email , password, name}) {
        try{
            const userAccount = await this.account.create(ID.unique() , email , password , name);
            if(userAccount){
                // call another method
                return this.login({email, password})
            }
            else {
                return userAccount;
            }

        }catch(error){
            throw error;
        }
    }
    async login({email , password}){
        try{
           return await this.account.createEmailPasswordSession(email , password);

        }catch(error){
            throw error;
        }
    }
    async getCurrentUser(){
        try{
            const user = await this.account.get();
            return user;
            
        } catch(error){
            console.log("appwrite error");
            throw error;
        }
    }
    async logout() {
        try{
            await this.account.deleteSessions();

        } catch(error){
            console.log("error loging out : " , error);
            throw error;
        }
    }

}

const authService = new AuthService();


export default authService