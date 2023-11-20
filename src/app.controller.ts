import { Controller, Post, Body, Get, Param, Put, Delete, HttpCode, ParseEnumPipe, ParseUUIDPipe, Query, UseInterceptors, UploadedFile, Res } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto } from "src/dtos/appData.dto";
import { AppService } from "./app.service";
import { UserType } from "./data";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterError, diskStorage } from "multer";



interface queryParams {
  name: string;
  email: string;
}

@Controller('users')
export class AppController {
  constructor(
    private readonly appService: AppService
  ) { }


  @Get()
  getAllUsers() {
    return this.appService.getAllUsers();
  }
  @Get(':type')
  getUser(@Param('type', new ParseEnumPipe(UserType)) type: string) {
    const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    return this.appService.getUser(userType);
  }
  @Get(':type/:id')
  getUserById(@Param('type', new ParseEnumPipe(UserType)) type: string,
    @Param('id', ParseUUIDPipe) id: string) {
    const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    return this.appService.getUserById(userType, id);
  }

  @Get('/query')
  getUserByQuery(@Query() query: queryParams) {
    console.log(query.name, query.email);
    return 'success';
  }


  @Post(':type')
  createUser(@Body() { name, email, password }: CreateUserDto, @Param('type', new ParseEnumPipe(UserType)) type: string) {
    const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    return this.appService.createUser({ name, email, password }, userType);
  }

  @Put(':type/:id')
  updateUser(@Param('type', new ParseEnumPipe(UserType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto) {
    const userType = type === "interviwer" ? UserType.INTERVIWER : type === "jobseeker" ? UserType.JOBSEEKER : UserType.JOBPROVIDER;
    return this.appService.updateUser(userType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteUser(
    @Param('id', ParseUUIDPipe) id: string
  ) {
    return this.appService.deleteUser(id);

  }





  @Post('fileupload')
  @UseInterceptors(FileInterceptor('file',
    {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 30000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname)
        },
      })
    }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Get('/getimage/:name')
  getImages(@Param('name') name, @Res() res) {
    res.sendFile(name, { root: './uploads' })
  }



}


//http://localhost:3000/

//http://localhost:3000/report/income
//http://localhost:3000/report/expense
//http://localhost:3000/report/expense/sdfsd
//http://localhost:3000/report/income/idafasdfasd


