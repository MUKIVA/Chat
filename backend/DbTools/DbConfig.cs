using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;

namespace backend.DbTools
{
    public static class DbConfig
    {
        public static NpgsqlConnection? Connection { get; private set; }
        public static string DB_PORT { get; } = Environment.GetEnvironmentVariable(nameof(DB_PORT)) ?? "5432";
        public static string DB_HOST { get; } = Environment.GetEnvironmentVariable(nameof(DB_HOST)) ?? "localhost";
        public static string DB_USER { get; } = Environment.GetEnvironmentVariable(nameof(DB_USER)) ?? "admin";
        public static string DB_PASSWORD { get; } = Environment.GetEnvironmentVariable(nameof(DB_PASSWORD)) ?? "root";
        public static string DB_NAME { get; } = Environment.GetEnvironmentVariable(nameof(DB_NAME)) ?? "postgres";
        
        public static string GetConnectionString()
        {
            return $"Host={DB_HOST};Username={DB_USER};Password={DB_PASSWORD};Database={DB_NAME}";
        }

        public static void InitConnection()
        {
            Connection = new NpgsqlConnection(GetConnectionString());
        }
    }
}