FROM ubuntu:22.04 AS builder

# install the .NET 6 SDK from the Ubuntu archive
# (no need to clean the apt cache as this is an unpublished stage)
RUN apt-get update && apt-get install -y dotnet6 ca-certificates

# add your application code
WORKDIR /source
# using https://github.com/Azure-Samples/dotnetcore-docs-hello-world
COPY . .

# publish your ASP.NET app
RUN dotnet publish -c Release -o /app --self-contained false

FROM ubuntu/dotnet-aspnet

WORKDIR /app
COPY --from=builder /app ./

ENV PORT 8080
EXPOSE 8080

ENTRYPOINT ["dotnet", "/app/backend.dll"]