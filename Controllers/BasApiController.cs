﻿using ChatApp.Helpers;
using Microsoft.AspNetCore.Mvc;

namespace ChatApp.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/[controller]")]
    [ApiController]
    public class BasApiController : ControllerBase
    {
    }
}
