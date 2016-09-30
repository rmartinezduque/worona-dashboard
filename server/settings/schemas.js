import { settings } from './collections';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

settings.schema = new SimpleSchema({
  siteId: {
    type: String,
  },
  name: {
    type: String,
  },
  categoryName: {
    type: String,
  },
  target: {
    type: String,
  },
});

settings.attachSchema(settings.schema);