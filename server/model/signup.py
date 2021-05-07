from common import *

def getTable():
    conn = Connection()
    if conn:
        try:
            #MainTable
            sql = """SELECT memberId
            , pass
            , email
            , name
            , tel
            , DATE_FORMAT(regDate, '%%Y-%%m-%%d %%H:%%i') AS regDate
            , DATE_FORMAT(loginDate, '%%Y-%%m-%%d %%H:%%i') AS loginDate
            FROM member"""
            dataMain = conn.executeAll(sql)

            json_data = json.dumps([dataMain])
            return json_data
        except Exception as e:
            return json.dumps({'message': f'{e}'}), 400
