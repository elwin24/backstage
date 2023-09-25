import { errorHandler } from '@backstage/backend-common';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';
import { Logger } from 'winston';

const fetch = require('node-fetch')

export interface RouterOptions {
  logger: Logger;
  config: Config;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;
  

  const router = Router();
  router.use(express.json());

  router.get('/health', (_, response) => {
    logger.info('PONG!');
    response.json({ status: 'ok' });
  });

  router.get('/hello', (_, response) => {
    logger.info('Get hello request');
    response.send({ status: 'world' });
  });

  router.get('/config/:configId', (request, response) => {
    const { configId } = request.params;
    logger.info(configId);
    logger.info("Got request to read a config");
    const value = config.getOptionalString(`my-plugin.${configId}`);
    response.send({ response: value });
  } );

  router.get('/developer-portal', async (_, response) => {
    logger.info('Get developer portal data');

    try {
     
      const apiResponse = await fetch(
        'https://developerportal-dev.abb-bank.az/abb-dp-service-mesh-bff/dashboard/search-node-list?search-term=&sortDirection=asc&orderBy=&page=1&size=7' )
      const apiResponseJson = await apiResponse.json()
      console.log(apiResponseJson)
      response.send({data : apiResponseJson})
    } catch (err) {
      console.log(err)
      response.status(500).send('Something went wrong')
    }
  });


  router.use(errorHandler());
  return router;
}


