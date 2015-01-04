import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const config = process.env.CONFIG;
const contents = yaml.load(fs.readFileSync(path.join(__dirname, 'config.yml'), 'utf8'));

export default contents[config] || contents.defaults;
