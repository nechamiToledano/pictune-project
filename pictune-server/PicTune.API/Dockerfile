# Use the official .NET SDK image for building the project
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Copy the solution and project files
COPY *.sln ./
COPY pictune-server/PicTune.Api/*.csproj /app/PicTune.Api/
COPY pictune-server/PicTune.Core/*.csproj /app/PicTune.Core/
COPY pictune-server/PicTune.Data/*.csproj /app/PicTune.Data/
COPY pictune-server/PicTune.Service/*.csproj /app/PicTune.Service/


# Restore dependencies
RUN dotnet restore

# Copy the rest of the project files and build
COPY . ./
WORKDIR /app/PicTune.Api
RUN dotnet publish -c Release -o out

# Use the official .NET runtime image for running the project
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/PicTune.Api/out .
ENV ASPNETCORE_URLS=http://+:5000
CMD ["dotnet", "PicTune.Api.dll"]
