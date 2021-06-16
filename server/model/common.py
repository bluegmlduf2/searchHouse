from common import *

def getCode(args):
    conn = Connection()
    if conn:
        try:
            dataArr=[]
            for idx,elem in enumerate(args):
                #요청코드수만큼반환 
                #LIKE %% 사용하여야함. %가 2개
                sql = """SELECT code, name
                    FROM house.code
                    WHERE code LIKE '{code}%%'""".format(code=elem)
                dataArr.append(conn.executeAll(sql))
            return json.dumps(dataArr)
        except Exception as e:
            return json.dumps({'message': f'{e}'}), 400
