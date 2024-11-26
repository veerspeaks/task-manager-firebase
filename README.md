# Task Manager App

A modern task management application built with Next.js, Firebase, and Framer Motion.

## Features
- Create, edit, and delete tasks
- Real-time updates with Firebase
- Smooth animations using Framer Motion
- Responsive design

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

## Setup Instructions

### 1. Clone the Repository

```bash
git clone [your-repository-url]
cd task-manager
```

### 2. Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Firestore Database
4. Go to Project Settings > General > Your Apps
5. Click on Web App (</>)
6. Register your app and get your credentials
7. Create a `.env.local` file in the root directory and add your Firebase credentials:
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 3. Install Dependencies
```bash
npm install
# or
yarn install
```

### 4. Run the Development Server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

### Deploy on Vercel (Recommended)
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

1. Push your code to a GitHub repository
2. Import your project to Vercel
3. Add your environment variables in Vercel's project settings
4. Deploy!

Live URL: [https://task-manager-firebase-alpha.vercel.app/](https://task-manager-firebase-alpha.vercel.app/)

## Built With
- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
