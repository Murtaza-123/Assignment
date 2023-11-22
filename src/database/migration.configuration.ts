import { DataSource, DataSourceOptions } from 'typeorm';
import OrmConfig from './configuration';
export const connectionSource = new DataSource(OrmConfig as DataSourceOptions);
