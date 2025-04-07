import conf from "../conf/conf.js";
import { Client , ID, Databases , Storage ,Query } from "appwrite";


export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectID);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);

    }
    async createPost({title , slug, content , featuredImage ,status , userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )


        }catch(error){
            console.log("error creating post : ", error);
            throw error;

        }

    }
    async updatePost(slug, {title, content , featuredImage, status}) {
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }

            )

        }catch(error){
            console.log('error updating post : ' , error);
            throw error;
        }
    }
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
            return true;

        }catch(error){
            console.log('error deleting post : ', error);
            return false;
        }
    }
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                slug
            )
        }catch(error){
            console.log('error getting post : ');
        }
    }
    async getPosts(queries = [Query.equal("status" , "active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseID,
                conf.appwriteCollectionID,
                queries,
            )

        } catch(error){
            console.log('error getting posts : ' , error.message);
        }

    }

    //file upload service

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketID,
                ID.unique(),
                file
            )
        } catch(error){
            console.log("appwrite service error : " , error);
        }
    }
    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketID,
                fileId
            )
            return true;
        }catch(error) {
            console.log('appwrite service error : ' , error);
            return false;
        }

    }
    getFilePreview(fileId){
        return this.bucket.getFileView(
            conf.appwriteBucketID,
            fileId
        )
    }

}

const appwriteService = new Service();


export default appwriteService;