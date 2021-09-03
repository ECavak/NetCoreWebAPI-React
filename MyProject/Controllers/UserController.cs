using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MongoDB.Bson;
using MongoDB.Driver;
using MyProject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration configuration)
        {
            _configuration = configuration;

        }
        
      [HttpGet]
        //[Route("/GetUser")]
        public JsonResult Get()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ConnectDb"));
            var dbList = dbClient.GetDatabase("MyProject").GetCollection<User>("User").AsQueryable();

            
            return new JsonResult(dbList);
        }
        [HttpPost]
        //[Route("/CreateUser")]
        public JsonResult Post(User user)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ConnectDb"));
            dbClient.GetDatabase("MyProject").GetCollection<User>("User").InsertOne(user);

            return new JsonResult("Added Successfully");
        }
        [HttpPut]
        //[Route("/ChangePassword")]
        public JsonResult Put(User user)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ConnectDb"));
            var filter = Builders<User>.Filter.Eq("Id", user.Id);
            var change = Builders<User>.Update.Set("userName", user.userName)
                .Set("userEmail", user.userEmail)
                .Set("Password", user.Password)
                .Set("City", user.City)
                .Set("Country", user.Country)
                .Set("userAddress", user.userAddress)
                .Set("phoneNumber", user.PhoneNumber);

            dbClient.GetDatabase("MyProject").GetCollection<User>("User").UpdateMany(filter, change);
            return new JsonResult("Updated Successfully");
        }
        [HttpDelete]
        //[Route("/DeleteUser")]
        public JsonResult Delete(User user)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ConnectDb"));
            var filter = Builders<User>.Filter.Eq("Id", user.Id);
            dbClient.GetDatabase("MyProject").GetCollection<User>("User").DeleteOne(filter);

            return new JsonResult("Deleted Successfully");
        }
    }
}

