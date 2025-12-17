# Stage 1: Build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copy and restore as distinct layers for better caching
COPY ["ProjectTasksManager.csproj", "./"]
RUN dotnet restore "ProjectTasksManager.csproj"

# Copy everything else and build
COPY . .
RUN dotnet build "ProjectTasksManager.csproj" -c Release -o /app/build

# Stage 2: Publish
FROM build AS publish
RUN dotnet publish "ProjectTasksManager.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Stage 3: Runtime (Final)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
EXPOSE 8080
COPY --from=publish /app/publish .

# Environment variable to enable Swagger (by default Docker runs as 'Production')
ENV ASPNETCORE_ENVIRONMENT=Development

ENTRYPOINT ["dotnet", "ProjectTasksManager.dll"]