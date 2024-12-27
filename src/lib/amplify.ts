import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'ap-northeast-2',
    userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: 'TodoAPI',
        endpoint: process.env.NEXT_PUBLIC_API_URL,
        region: 'ap-northeast-2',
      },
    ],
  },
});
