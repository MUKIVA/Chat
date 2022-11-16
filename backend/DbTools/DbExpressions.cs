using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Npgsql;
using backend.Models;

namespace backend.DbTools
{
    public static class DbExpressions
    {
        public async static Task<UserModel[]> GetAllUsers()
        {
            List<UserModel> data = new List<UserModel>();
            var conn = DbConfig.Connection;
            if (conn == null) return data.ToArray();
            try
            {
                conn.Open();
                var sql = @"SELECT * FROM chat_user";
                var cmd = new NpgsqlCommand(sql, conn);
                var reader = await cmd.ExecuteReaderAsync();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        data.Add(new UserModel() 
                        {
                            Name = (string)reader["username"]
                        }); 
                    }
                }
            }
            finally
            {
                conn.Close();
                
            }
            return data.ToArray();
        }

        public async static Task AddUser(string name)
        {
            var conn = DbConfig.Connection;
            if (conn == null) return;
            try
            {
                conn.Open();
                var sql = $@"INSERT INTO chat_user VALUES ('{name}')";
                var cmd = new NpgsqlCommand(sql, conn);
                await cmd.ExecuteReaderAsync();
            }
            finally
            {
                conn.Close();   
            }
        }

        public async static Task AddMessage(string name, string msg)
        {
            var conn = DbConfig.Connection;
            if (conn == null) return;
            try
            {
                conn.Open();
                var sql = $@"INSERT INTO user_message (chat_user_name, msg) VALUES ('{name}', '{msg}')";
                var cmd = new NpgsqlCommand(sql, conn);
                await cmd.ExecuteReaderAsync();
            }
            finally
            {
                conn.Close();   
            }
        }

        public async static Task<TimedMessageModel[]> GetMessagesRange(int offset, int count)
        {
            List<TimedMessageModel> data = new();
            var conn = DbConfig.Connection;
            if (conn == null) return data.ToArray();
            try
            {
                conn.Open();
                var sql = $@"SELECT * FROM user_message ORDER BY id DESC LIMIT {count} OFFSET {offset}";
                var cmd = new NpgsqlCommand(sql, conn);
                var reader = await cmd.ExecuteReaderAsync();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        data.Add(new TimedMessageModel() 
                        {
                            Name = (string)reader["chat_user_name"],
                            Msg = (string)reader["msg"],
                            TimeMs = 
                            ((DateTime)reader["create_time"])
                                .Subtract(new DateTime(1970,1,1,0,0,0,DateTimeKind.Utc))
                                .TotalMilliseconds
                        }); 
                    }
                }
            }
            finally
            {
                conn.Close();   
            }
            return data.ToArray();
        }
    }
}