import  utils from '../utils/utils';
import mockAxios from "axios";

//declare consts to mock test
const posts = [
    { title: "Test", author: "Test", date: '2021-12-12', text: 'Test'},
    { title: "Test1", author: "Test1", date: '2021-12-12', text: 'Test1'},
];


test('test getposts works, calls get with axios and returns a post', async () => {
            
           
            // console.log(posts);

            mockAxios.get.mockImplementationOnce(() => Promise.resolve(posts));
            // console.log(posts);
            
            const result = await getPosts(callbackFunction);
   
            expect(axios.get).toHaveBeenCalledWith(`http://localhost:1337/api/posts`);
            expect(result).toEqual(posts);
    
        });
