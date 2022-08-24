FROM node:16 as client

# Build the client
COPY ../client/ client/
WORKDIR $HOME/client
RUN yarn install
RUN yarn build

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Build the server
COPY ../server/ server/
RUN dotnet publish ./server/cube-api.csproj -c Release

FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Set environment variables
ENV HOME /root

# Copy compiled and configuration files
COPY --from=client client/build/ $HOME/cube/wwwroot/
COPY --from=build server/bin/Release/net6.0/publish $HOME/cube/

# Set appropriate conditions to run the image
WORKDIR $HOME/cube
CMD dotnet cube-api.dll