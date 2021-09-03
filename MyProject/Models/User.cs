using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MyProject.Models.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MyProject.Models
{
    public class User
    {
        //public User()
        //{
        //    User user = new User();
        //    user.Role = Role.User;

        //}
       
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string userName { get; set; }
        public string Password { get; set; }
        public string userEmail { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string userAddress { get; set; }
        public string PhoneNumber { get; set; }
        public Role Role  {get;set;}

    }
}
