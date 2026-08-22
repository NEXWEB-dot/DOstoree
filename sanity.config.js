import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemaTypes/index.js';

export default defineConfig({
  name: 'dostore-studio',
  title: 'DO Store CMS',

  projectId: 'your-project-id', // Replace with your Sanity Project ID
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
