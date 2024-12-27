using AutoMapper;
using ChatApp.DTOs;
using ChatApp.Extensions;
using ChatApp.Models;

namespace ChatApp.Helpers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<AppUser, MemberDto>().
                ForMember(dest=>dest.PhotoUrl,options=>options.MapFrom(src=>src.Photos.FirstOrDefault(p=>p.IsMain)!.Url)).
                ForMember(dest=>dest.Age,options=>options.MapFrom(src=>src.DateOfBirth.CalculateAge()));
            CreateMap<Photo, PhotoDto>();

            CreateMap<UpdateMemberDto,AppUser>();
        }
    }
}
