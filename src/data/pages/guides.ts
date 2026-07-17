import type { DocPage } from '@/types/documentation'

export const welcomePage: DocPage = {
  title: 'Welcome',
  description:
    'Welcome to the Bull Play Casino API Documentation! Here you will find everything you need to integrate our casino platform into your operator system.',
  blocks: [
    {
      type: 'paragraph',
      text: 'You will see the core features of the Bull Play Casino API in action — from player onboarding and game launches to wallet operations and transaction reporting.',
    },
    { type: 'heading', level: 3, text: 'Jump right in', id: 'jump-right-in' },
    {
      type: 'feature-cards',
      cards: [
        {
          title: 'Getting Started',
          subtitle: 'Introduction',
          path: '/introduction',
          image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=340&fit=crop',
        },
        {
          title: 'Fundamentals',
          subtitle: 'Learn the basics of Bull Play Casino API',
          path: '/fundamentals',
          image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=340&fit=crop',
        },
        {
          title: 'Dig Deeper',
          subtitle: 'API Reference',
          path: '/main-api',
          image:
            'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=340&fit=crop',
        },
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      title: 'Integration modes',
      text: 'Bull Play supports both Seamless Wallet and Balance Transfer integration models. Choose the workflow that matches your platform architecture.',
    },
  ],
}

export const introductionPage: DocPage = {
  title: 'Introduction',
  description: 'An overview of the Bull Play Casino API and how to get started with integration.',
  blocks: [
    {
      type: 'paragraph',
      text: 'The Bull Play Casino API allows operators to connect their platform to a wide catalog of casino games, manage players, handle wallet transactions, and monitor gameplay activity in real time.',
    },
    { type: 'heading', level: 2, text: 'What you can build', id: 'what-you-can-build' },
    {
      type: 'list',
      items: [
        'Register players and map them to internal player codes',
        'Launch games from multiple providers in a single integration',
        'Operate in Seamless or Balance Transfer wallet modes',
        'Query transactions, rounds, and bonus call activity',
      ],
    },
    { type: 'heading', level: 2, text: 'Base URL', id: 'base-url' },
    {
      type: 'code',
      language: 'text',
      title: 'Production',
      code: 'https://api.bullplay.example/v1',
    },
    { type: 'heading', level: 2, text: 'Authentication', id: 'authentication' },
    {
      type: 'paragraph',
      text: 'All Main API requests require a Bearer token in the Authorization header. Your integration manager will provide API credentials during onboarding.',
    },
    {
      type: 'table',
      headers: ['Header', 'Value'],
      rows: [
        ['Authorization', 'Bearer <your_api_token>'],
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json'],
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      title: 'Next step',
      text: 'Read Fundamentals to understand request/response conventions, error handling, and integration modes before calling production endpoints.',
    },
  ],
}

export const fundamentalsPage: DocPage = {
  title: 'Fundamentals',
  description: 'Core concepts and conventions used across the Bull Play Casino API.',
  blocks: [
    {
      type: 'paragraph',
      text: 'This page provides a basic understanding of how the API is structured, how responses are formatted, and what to expect when integrating with Bull Play.',
    },
    { type: 'heading', level: 2, text: 'Response format', id: 'response-format' },
    {
      type: 'paragraph',
      text: 'Successful responses follow a consistent envelope with success, message, and data fields.',
    },
    {
      type: 'code',
      language: 'json',
      code: `{
  "success": true,
  "message": "OK",
  "data": {}
}`,
    },
    { type: 'heading', level: 2, text: 'Error handling', id: 'error-handling' },
    {
      type: 'paragraph',
      text: 'When a request fails, success is false and message contains a human-readable explanation. HTTP status codes reflect the error category.',
    },
    {
      type: 'table',
      headers: ['HTTP Status', 'Meaning'],
      rows: [
        ['400', 'Invalid request parameters or malformed body'],
        ['401', 'Missing or invalid authentication token'],
        ['404', 'Resource not found'],
        ['409', 'Conflict — duplicate or invalid state transition'],
        ['500', 'Internal server error'],
      ],
    },
    { type: 'heading', level: 2, text: 'Idempotency', id: 'idempotency' },
    {
      type: 'paragraph',
      text: 'Wallet and transaction callbacks should be processed idempotently using unique transaction identifiers to prevent duplicate balance updates.',
    },
    { type: 'heading', level: 2, text: 'Integration modes', id: 'integration-modes' },
    {
      type: 'list',
      items: [
        'Seamless Wallet — Bull Play calls your wallet endpoints for balance, bet, win, and cancel operations.',
        'Balance Transfer — Player funds are deposited into and withdrawn from Bull Play managed wallets via Main API endpoints.',
      ],
    },
  ],
}
