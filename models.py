#!/usr/bin/env python
# -*- coding: UTF-8 -*-

from google.appengine.ext import ndb


sessionState = ["run", "stop"]
site_list = ["", "Gemenos", "Balrup", "Tours", "Fareham"]
serviceType = ["Electrical", "Graphical", "Carrier", "Packaging", "Dispatch", "SLA" ]
propertyKind = ["Property", "Instrumentation", "Consumable", "Instruction"]

class Property(ndb.Model):
	name = ndb.StringProperty(default="")
	value = ndb.StringProperty(default="")
	site = ndb.StringProperty(default="", choices=site_list)
	kind = ndb.StringProperty(default=propertyKind[0], choices=propertyKind)
	parent = ndb.KeyProperty()

class Service(ndb.Model):
	reference = ndb.StringProperty(default="")
	properties = ndb.KeyProperty(kind='Property', repeated=True)
	stype = ndb.StringProperty(default="Electrical", choices=serviceType)
	inputKeys = ndb.StringProperty(repeated=True)

class Process(ndb.Model):
	reference = ndb.StringProperty(default="")
	sElec = ndb.KeyProperty(kind='Service', repeated=True)
	sElecSentinel = ndb.ComputedProperty(lambda self: len(self.sElec) == 0)
	sGraph = ndb.KeyProperty(kind='Service', repeated=True)
	sGraphSentinel = ndb.ComputedProperty(lambda self: len(self.sGraph) == 0)
	sCarrier = ndb.KeyProperty(kind='Service', repeated=True)
	sCarrierSentinel = ndb.ComputedProperty(lambda self: len(self.sCarrier) == 0)
	sPack = ndb.KeyProperty(kind='Service', repeated=True)
	sPackSentinel = ndb.ComputedProperty(lambda self: len(self.sPack) == 0)
	sDisp = ndb.KeyProperty(kind='Service', repeated=True)
	sDispSentinel = ndb.ComputedProperty(lambda self: len(self.sDisp) == 0)
	sSLA = ndb.KeyProperty(kind='Service', repeated=True)
	sSLASentinel = ndb.ComputedProperty(lambda self: len(self.sSLA) == 0)
	sites = ndb.StringProperty(repeated=True)
	properties = ndb.KeyProperty(kind='Property', repeated=True)

class Product(ndb.Model):
	reference = ndb.StringProperty(default="")
	properties = ndb.KeyProperty(kind='Property', repeated=True)
	inputKeys = ndb.StringProperty(repeated=True)
	orderItem = ndb.StringProperty(default="")

class FullProduct(ndb.Model):
	reference = ndb.StringProperty(default="")
	elec = ndb.KeyProperty(kind='Service')
	graph = ndb.KeyProperty(kind='Service')
	carrier = ndb.KeyProperty(kind='Service')
	package = ndb.KeyProperty(kind='Service')
	dispatch = ndb.KeyProperty(kind='Service')
	SLA = ndb.KeyProperty(kind='Service')
	product = ndb.KeyProperty(kind='Product')
