import Handlebars from 'handlebars';

Handlebars.registerHelper('join', function(array, separator) {
  return array.join(separator);
});

export default Handlebars;
