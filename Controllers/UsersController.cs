using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers(){
            var _users =await _context.Users.ToListAsync();
            return _users;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUsers(int id){
            var _user = await _context.Users.FindAsync(id);
            return _user;
        }

        [HttpDelete]
        public async Task<string> RemoveUser(int id)
        {
            var _user = await _context.Users.FindAsync(id);
            if(_user is null)
            {
                return $"the user with id {id} was not found";
            }
            _context.Users.Remove(_user);

            _context.SaveChanges();

            return $"the user deleted is is -->{id}";
        }
    }
}