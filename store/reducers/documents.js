import DOCUMENTS from '../../DummyDocs/data'
const initialState={
    userDocuments: DOCUMENTS,
    userTags:['family','friends','sisters']

}
export default (state= initialState,action) =>{
    return state;
}
