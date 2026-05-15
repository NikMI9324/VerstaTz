FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["Versta.Api/Versta.Api.csproj", "Versta.Api/"]
COPY ["Versta.Application/Versta.Application.csproj", "Versta.Application/"]
COPY ["Versta.Domain/Versta.Domain.csproj", "Versta.Domain/"]
COPY ["Versta.Infrastructure/Versta.Infrastructure.csproj", "Versta.Infrastructure/"]
RUN dotnet restore "Versta.Api/Versta.Api.csproj"
COPY . .
WORKDIR "/src/Versta.Api"
RUN dotnet build "./Versta.Api.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Versta.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Versta.Api.dll"]
