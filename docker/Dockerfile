FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build

# Copy required files
COPY ../server/ src/

# Build the application
RUN dotnet publish ./src/cube-api.csproj -c Release

# Multi-stage build to discard source files
FROM mcr.microsoft.com/dotnet/aspnet:6.0

# Set environment variables
ENV HOME /root

# Copy compiled and configuration files
COPY --from=build src/bin/Release/net6.0/publish $HOME/cube/

# Set appropriate conditions to run the image
EXPOSE 80
WORKDIR $HOME/cube
CMD dotnet cube-api.dll