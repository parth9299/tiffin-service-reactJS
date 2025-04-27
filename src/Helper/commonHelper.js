export const getImageNameFromURL = (imageURL) => {
    const url = new URL(imageURL);  
    const pathSegments = url.pathname.split('/'); 
    return pathSegments[pathSegments.length - 1];  
};