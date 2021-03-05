import DOCUMENTS from '../../DummyDocs/data'
import {CREATE_DOCUMENT} from '../actions/documents'
import {DELETE_DOCUMENT} from '../actions/documents'
import {UPDATE_DOCUMENT} from '../actions/documents'
import Document from '../../models/Document'


const initialState={
    userDocuments: DOCUMENTS,
    userTags:['family','friends','sisters']

}
export default (state= initialState,action) =>{
    console.log('reducer actiontype',action.type)
    switch (action.type){
    case CREATE_DOCUMENT:
        const newDocument=new Document(
            '0',
            action.productData.ownerId,
            action.productData.title,
            action.productData.tags,
            'url'
            )
        return {
            ...state,
            userDocuments:state.userDocuments.concat(newDocument)
        }
    case UPDATE_DOCUMENT:
        // console.log('inside update document reducer')
            const documentInd=state.userDocuments.findIndex(doc =>doc.id ===action.documentId)
            // console.log(documentInd,state.userDocuments[documentInd])
            const updatedDocument = new Document (
                state.userDocuments[documentInd].id,
            
                state.userDocuments[documentInd].ownerId,
                state.userDocuments[documentInd].title,
                action.tags,
                state.userDocuments[documentInd].url,
            )
            const updatedUserDocuments=[...state.userDocuments]
            updatedUserDocuments[documentInd] = updatedDocument
            // console.log('updated state', updatedUserDocuments)
        return{
                ...state,
                userDocuments:updatedUserDocuments
            }
        case DELETE_DOCUMENT:
            console.log('in delete reducer')
            const newUserDocuments = state.userDocuments.filter(item => item.id!=action.documentId)
            console.log('new state',newUserDocuments)
            return{
                    ...state,
                    userDocuments:newUserDocuments
                }
        default:
            return state
            }
}
