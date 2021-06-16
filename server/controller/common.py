from flask import Blueprint, render_template,request
from model import common

common_ab = Blueprint('common_ab', __name__)

@common_ab.route('/code',methods=['POST'])
def code():
    '''코드반환'''
    if request.method == 'POST':
        args=request.get_json()
        return common.getCode(args)