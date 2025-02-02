﻿using ChatApp.DTOs;
using ChatApp.Helpers;
using ChatApp.Models;

namespace ChatApp.Interfaces
{
    public interface IUserRepository
    {
        void UpdateUser(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetAllAsync();
        Task<AppUser> GetByIdAsync(int id);
        Task<AppUser> GetByUserNameAsync(string userName);
        Task<MemberDto> GetMemberAsync(string userName);
        Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams);
    }
}
