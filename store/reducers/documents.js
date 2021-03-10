import {CHANGED_DOCUMENTS} from '../actions/documents'
import {LOAD_DOCUMENTS} from '../actions/documents'

import Document from '../../models/Document'


const initialState={
    touched:true,
    userDocuments: [],
    userTags:[]

}
export default (state= initialState,action) =>{
    console.log('document reducer actiontype',action.type)
    switch (action.type){
    case CHANGED_DOCUMENTS:
        return {
            ...state,
            touched:true
        }
    
    case LOAD_DOCUMENTS:
                console.log('in load document reducer')
                const uploadedDocuments = action.docList.map(item => new Document((item.id).toString(),(item.user_id).toString(),item.title,item.tags,item.url))
                
                return{
                        ...state,
                        userDocuments:uploadedDocuments,
                        userTags:action.tagList,
                        touched:false
                    }
    default:
            return state
            }
}
