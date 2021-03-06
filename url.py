__author__ = 'Winfred'
# coding: utf8
"""
用途：
    url匹配等基础项。
    使用tornado框架进行作业。
    使用utf-8编码。
"""
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.web
import os
import sys
import platform
from tornado.options import define, options

define("port", default=8888, help="run on the given port", type=int)
if platform.system() == "Windows":
    masterDir = u"D:/百度云同步盘/ThinkPadE430C/Winfred/Ease/"
settings = {
    "debug": True,
    "static_path": os.path.join(os.path.dirname(__file__), u"{0}static".format(masterDir)),
    "cookie_secret": "61oETzKXQAGaYdkL5gEmGeJJFuYh7EQnp2XdTP1o/Vo=",
    "login_url": "/login",
    }
define("debug", default=True, help="Debug mode.", type=bool)


class BaseHandler(tornado.web.RequestHandler):
    """基础类，设置cookie使用。
    """
    def get_current_user(self):
        return self.get_secure_cookie("user")


def add(x, y):
    return x + y


class MainHandler(BaseHandler):
    """网站主页
    要求必须通过用户验证才可以登录显示，否则重定向至/login
    """
    @tornado.web.authenticated
    def get(self):
        self.render("static/index.html", upload='123', add=add)


class LoginHandler(BaseHandler):
    """登录类
        1.登录
        2.接受登录请求做出处理。
    """
    def get(self):
        return self.render("static/index.html", upload='null', wrx='111')

    def post(self):
        if self.get_argument("name") == 'ease':
            self.set_secure_cookie("user", self.get_argument("name"))
            self.redirect('/')
        else:
            self.render("static/index.html", upload='222')


class LogoutHandler(BaseHandler):
    def get(self):
        # self.clear_cookie("user")
        self.clear_all_cookies()
        self.write('<meta http-equiv="refresh" content="2;URL=/login"><body>you are logout<body>')


def main():
    tornado.options.parse_command_line()
    app = tornado.web.Application([
        (r"/", MainHandler),
        (r"/login", LoginHandler),
        (r"/logout", LogoutHandler),
        ], **settings)
    http_server = tornado.httpserver.HTTPServer(app)
    http_server.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

try:
    main()
except KeyboardInterrupt:
    print "Ctrl-c to exit!"
    sys.exit(0)
