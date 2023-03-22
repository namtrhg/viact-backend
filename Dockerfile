FROM node:16.19.0-alpine3.16

WORKDIR /app

COPY package.json yarn.lock ./

COPY dist ./dist

# don't install any package listed in `devDependencies`
# don't generate a `yarn.lock` lockfile and fail if an update is needed.
RUN yarn install --frozen-lockfile --production

CMD ["yarn", "start:prod"]
