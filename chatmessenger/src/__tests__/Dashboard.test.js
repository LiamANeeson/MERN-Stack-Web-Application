import { getUniquePostFields, createPost } from '../pages/Dashboard';
import { render, screen } from '@testing-library/react';
import { Dashboard } from '@material-ui/icons';

//reset the mock tests before each run
beforeEach(() => {
    fetch.resetMocks();
  });

  //test uploading an image
test('uploadImage', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({data: "test.jpg"}));

    const createdImage = await uploadImage();
    expect(createdPost).toBe({data: "test.jpg"});
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(fetch).toHaveBeenCalledWith(
        `https://api.cloudinary.com/v1_1/dxghxvvfj/image/upload`
    );

}); 


test('gets Unique Post Fields', async () => {
    
    fetch.mockResponseOnce(JSON.stringify({title: "Test", text: "Test" }));

    const createdPost = await createPost();
    expect(createdPost).toBe({title: "Test", text: "Test" })
    expect(fetch).toHaveBeenCalledTimes(0);
    expect(fetch).toHaveBeenCalledWith(
        `http://localhost:1337/api/post`
    );

});  

