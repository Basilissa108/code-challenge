## Running the application

1. Create a .env.local file with the following line to include your openAI API key.
   `OPENAI_API_KEY={YOUR_OPENAI_API_KEY}`

2. Install dependencies running the fowllowing command.

```bash
npm install
```

3. Run the development server by running the following command.

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Architecture

### OpenAI API

I chose to use the openAI API since I was already familiar with openAI from interacting with ChatGPT. I'm using an environment variable for keeping the API key save.

### UI elements

The UI elements are organized within the `components` folder. I opted for a medium level of granularity in structuring the components to strike a balance between keeping things organized and avoiding too much file hopping. For instance, parts of the `ChatHistory` component could have been extracted into a separate `Message` component. However, since the project didn’t demand extensive reusability, this approach seemed like the best way to maintain a clear overview without over-engineering.

I decided to render the messages using the `React-Markdown` library for keeping the formatting to support better readability. For rendering links, I'm using the `Remark-Gfm` library with a custom renderer to style links and open them in a new tab. For security reasons, I'm sanitizing the messages with the library `DOMPurify`.

### API

The API for handling POST requests to the OpenAI API is located in the `API` folder. I'm using the native `fetch` API directly instead of an external library like `Axios` due to the simplicity of the project. The application is using simple POST requests for which it seemed unnecessary to set up a library when its advanced features wouldn't be used. Additionally, we can avoid the slight performance overhead.

I'm using an `AbortController` to abort requests when the user decides to cancel a request. Similar to the functionality of ChatGPT I'm not displaying an error when a request is aborted, assuming this is intentional.

## Production readiness

### Websocket

I'd implement a websocket for keeping an open connection to the server instead of repeatedly sending single requests. This would allow for real-time communication and enhance performance and scalability.

### Rate limiting

While the cancel functionality of the UI already prevents sending another request before the current one has completed, I'd additionally implement rate limits to avoid unnecessary API calls and overuse of the API in case users are bypassing the limitation. This can be done by implementing a gatekeeper middleware or using an external library.

### Performance optimization

To optimize for performance, I would implement caching. Additionally, I would use a token limit for the requests to the OpenAI API for faster response times and reduced latency.

### Scalability

For handling increased traffic I would use caching and load balancing to distribute the incoming traffic across multiple servers.

### Security

The application should be served over HTTPS and I would add a Content Security Policy to prevent cross-site scripting.

### Testing

I would use unit tests for testing the functionality of each component, as well as snapshot tests for detecting unintentional UI changes. Additionally, I'd use integration tests to ensure the integration between the components and the API is working as expected.

### Monitoring

I'd set up a logging and monitoring tool such as Datadog for error and performance monitoring to make sure the application is running smoothly and detect issues early on.

### Deployment

For deployment I would chose Netlify since I already have experience with it and it supports automatic scaling, easy integration with GitHub Actions for CI/CD, and environment variables for production.

