USE [master]
GO
/****** Object:  Database [job-application-socialmedia]    Script Date: 16/11/2566 17:27:59 ******/
CREATE DATABASE [job-application-socialmedia]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'job-application-socialmedia', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\job-application-socialmedia.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'job-application-socialmedia_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\job-application-socialmedia_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [job-application-socialmedia] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [job-application-socialmedia].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [job-application-socialmedia] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET ARITHABORT OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [job-application-socialmedia] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [job-application-socialmedia] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET  ENABLE_BROKER 
GO
ALTER DATABASE [job-application-socialmedia] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [job-application-socialmedia] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [job-application-socialmedia] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET RECOVERY FULL 
GO
ALTER DATABASE [job-application-socialmedia] SET  MULTI_USER 
GO
ALTER DATABASE [job-application-socialmedia] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [job-application-socialmedia] SET DB_CHAINING OFF 
GO
ALTER DATABASE [job-application-socialmedia] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [job-application-socialmedia] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [job-application-socialmedia] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [job-application-socialmedia] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'job-application-socialmedia', N'ON'
GO
ALTER DATABASE [job-application-socialmedia] SET QUERY_STORE = OFF
GO
USE [job-application-socialmedia]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 16/11/2566 17:27:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Accounts]    Script Date: 16/11/2566 17:27:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Accounts](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](max) NOT NULL,
	[LastName] [nvarchar](max) NOT NULL,
	[Email] [nvarchar](max) NOT NULL,
	[Password] [nvarchar](max) NOT NULL,
	[ProfileImageUrl] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Accounts] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Comments]    Script Date: 16/11/2566 17:27:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Comments](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Message] [nvarchar](max) NOT NULL,
	[AccountId] [int] NOT NULL,
	[ContentId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_Comments] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ContentImages]    Script Date: 16/11/2566 17:27:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContentImages](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[ImageUrl] [nvarchar](max) NOT NULL,
	[ContentId] [nvarchar](450) NOT NULL,
 CONSTRAINT [PK_ContentImages] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Contents]    Script Date: 16/11/2566 17:27:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contents](
	[Id] [nvarchar](450) NOT NULL,
	[Created] [datetime2](7) NULL,
	[Message] [nvarchar](max) NOT NULL,
	[AccountId] [int] NOT NULL,
 CONSTRAINT [PK_Contents] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Trackings]    Script Date: 16/11/2566 17:27:59 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Trackings](
	[FriendId] [int] NOT NULL,
	[AccountId] [int] NOT NULL,
 CONSTRAINT [PK_Trackings] PRIMARY KEY CLUSTERED 
(
	[FriendId] ASC,
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20231116083713_CreateDBToServer', N'7.0.13')
GO
SET IDENTITY_INSERT [dbo].[Accounts] ON 

INSERT [dbo].[Accounts] ([Id], [FirstName], [LastName], [Email], [Password], [ProfileImageUrl]) VALUES (1, N'Html', N'Kung', N'Html@gmail.com', N'$2a$11$TL1kK23UXchj41ZdcttVW.OKiHLSmubOPMbVDuV46NwNZLjiSiVQO', N'a3f45718-9485-43cc-9b4f-49484e6b8813.jpg')
INSERT [dbo].[Accounts] ([Id], [FirstName], [LastName], [Email], [Password], [ProfileImageUrl]) VALUES (2, N'Css', N'Kung', N'Css@gmail.com', N'$2a$11$mg4yspw5.4yTV1TaqxaC0e9YlaYCkaBa7mUCQLQ3nqN14qrC2QPty', N'41a51c61-5328-4afa-a75f-301d2327494d.jpg')
INSERT [dbo].[Accounts] ([Id], [FirstName], [LastName], [Email], [Password], [ProfileImageUrl]) VALUES (3, N'JavaScript', N'Kung', N'JavaScript@gmail.com', N'$2a$11$AjsryxnpmwHip2Bo2anwOe.kJbBX7WvFkZK2/VfbC8c/WvgLfqnYi', N'87f5bfda-07e1-45ef-9086-4397006b3010.jpg')
INSERT [dbo].[Accounts] ([Id], [FirstName], [LastName], [Email], [Password], [ProfileImageUrl]) VALUES (4, N'Bootstrap', N'Kung', N'Bootstrap@gmail.com', N'$2a$11$IIq.aibf8UuHTQxQ.0Df2OR0xDSKT0Ai3/uSmEQcQ/pPERQzTUAue', N'ce989dba-bec7-4e65-a7e6-ed78bee03263.jpg')
INSERT [dbo].[Accounts] ([Id], [FirstName], [LastName], [Email], [Password], [ProfileImageUrl]) VALUES (5, N'Foundation', N'Kung', N'Foundation@gmail.com', N'$2a$11$7E7aZf8JNg.mhj.ji3NPA.buSaNjdNiycTxqc8yyN1jXS8G3NJim2', N'5d1307cd-2694-471b-a8fa-c0dbdbafe793.jpg')
SET IDENTITY_INSERT [dbo].[Accounts] OFF
GO
SET IDENTITY_INSERT [dbo].[ContentImages] ON 

INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (15, N'c8e1259a-4ce2-4f99-a07f-6be978b3ba49.jpg', N'20231116171625.574510')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (16, N'cf2fefa8-4547-4fd0-91e6-0914f5583384.png', N'20231116171625.574510')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (17, N'6f73e4dc-02c1-41b2-a2e5-72108dae29e9.jpg', N'20231116171637.766006')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (18, N'5533adaf-729b-4f11-8333-dd78f30eeeb4.jpg', N'20231116171637.766006')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (19, N'eaac3b9d-2ec4-432f-8944-ca584c7c77d3.jpg', N'20231116171648.304539')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (20, N'4aff936a-3d19-4e7a-b6a7-245901178edf.jpg', N'20231116171648.304539')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (21, N'e2514563-b672-42be-8233-f53da2f65c1a.jpg', N'20231116171712.284105')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (22, N'1d50e622-06e3-4704-bc9e-3b80fdf4e7fc.jpg', N'20231116171712.284105')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (23, N'3e9bca83-6037-45bb-b0b2-290519038cb7.jpg', N'20231116171732.140316')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (24, N'f9ac5169-6f8b-4ac8-9924-e6aedfe8e4c6.jpg', N'20231116171732.140316')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (25, N'd57bb886-80ed-4f59-ab0a-80c77cd3c7ce.png', N'25661116172157.992150')
INSERT [dbo].[ContentImages] ([Id], [ImageUrl], [ContentId]) VALUES (26, N'e0417f87-fe98-4fb0-be56-a34d106e371c.png', N'20231116172452.731911')
SET IDENTITY_INSERT [dbo].[ContentImages] OFF
GO
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'20231116171625.574510', CAST(N'2023-11-16T17:16:25.9615509' AS DateTime2), N'Css''s post 01', 2)
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'20231116171637.766006', CAST(N'2023-11-16T17:16:37.5215992' AS DateTime2), N'Css''s post 02', 2)
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'20231116171648.304539', CAST(N'2023-11-16T17:16:48.1774366' AS DateTime2), N'Css''s post 03', 2)
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'20231116171712.284105', CAST(N'2023-11-16T17:17:12.8892089' AS DateTime2), N'Html''s post 01', 1)
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'20231116171732.140316', CAST(N'2023-11-16T17:17:32.4275074' AS DateTime2), N'Html''s post 02', 1)
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'20231116171743.296491', CAST(N'2023-11-16T17:17:43.8223684' AS DateTime2), N'Html''s post 03', 1)
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'20231116172452.731911', CAST(N'2023-11-16T17:24:52.5213709' AS DateTime2), N'Foundation''s Post 01
', 5)
INSERT [dbo].[Contents] ([Id], [Created], [Message], [AccountId]) VALUES (N'25661116172157.992150', CAST(N'2023-11-16T17:21:57.9683594' AS DateTime2), N'Bootstrap''s post 01', 4)
GO
INSERT [dbo].[Trackings] ([FriendId], [AccountId]) VALUES (1, 2)
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_Comments_ContentId]    Script Date: 16/11/2566 17:27:59 ******/
CREATE NONCLUSTERED INDEX [IX_Comments_ContentId] ON [dbo].[Comments]
(
	[ContentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_ContentImages_ContentId]    Script Date: 16/11/2566 17:27:59 ******/
CREATE NONCLUSTERED INDEX [IX_ContentImages_ContentId] ON [dbo].[ContentImages]
(
	[ContentId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Contents_AccountId]    Script Date: 16/11/2566 17:27:59 ******/
CREATE NONCLUSTERED INDEX [IX_Contents_AccountId] ON [dbo].[Contents]
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [IX_Trackings_AccountId]    Script Date: 16/11/2566 17:27:59 ******/
CREATE NONCLUSTERED INDEX [IX_Trackings_AccountId] ON [dbo].[Trackings]
(
	[AccountId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Comments]  WITH CHECK ADD  CONSTRAINT [FK_Comments_Contents_ContentId] FOREIGN KEY([ContentId])
REFERENCES [dbo].[Contents] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Comments] CHECK CONSTRAINT [FK_Comments_Contents_ContentId]
GO
ALTER TABLE [dbo].[ContentImages]  WITH CHECK ADD  CONSTRAINT [FK_ContentImages_Contents_ContentId] FOREIGN KEY([ContentId])
REFERENCES [dbo].[Contents] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ContentImages] CHECK CONSTRAINT [FK_ContentImages_Contents_ContentId]
GO
ALTER TABLE [dbo].[Contents]  WITH CHECK ADD  CONSTRAINT [FK_Contents_Accounts_AccountId] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Accounts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Contents] CHECK CONSTRAINT [FK_Contents_Accounts_AccountId]
GO
ALTER TABLE [dbo].[Trackings]  WITH CHECK ADD  CONSTRAINT [FK_Trackings_Accounts_AccountId] FOREIGN KEY([AccountId])
REFERENCES [dbo].[Accounts] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Trackings] CHECK CONSTRAINT [FK_Trackings_Accounts_AccountId]
GO
USE [master]
GO
ALTER DATABASE [job-application-socialmedia] SET  READ_WRITE 
GO
