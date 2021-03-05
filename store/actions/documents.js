export const UPDATE_DOCUMENT ='UPDATE_DOCUMENT'
export const DELETE_DOCUMENT ='DELETE_DOCUMENT'
export const CREATE_DOCUMENT = 'CREATE_DOCUMENT'

export const deleteDocument=documentId=>{
    console.log('im in delete function action')
    return{type:DELETE_DOCUMENT, documentId:documentId}
}
export const createDocument=(title,tags)=>{
    return{type:CREATE_DOCUMENT, productData:{
        title:title,
        tags:tags}}
}
export const updateDocument=(documentId,tags,token)=>{
    return async dispatch =>{
        const response = await fetch ('/modify_tags',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`

            },
            body:JSON.stringify({
                documentId:documentId,
                tags:tags
            }
        )
        });
        const resData = await response.json();
        console.log(resData);
        dispatch({
            type:UPDATE_DOCUMENT, 
            documentId:documentId, 
            tags:tags
        })

    }
    // console.log('update action creator',documentId,tags)
}
